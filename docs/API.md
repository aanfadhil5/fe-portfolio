# API Documentation

This document provides comprehensive documentation for all API endpoints in the fe-portfolio project.

## Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [Analytics Endpoints](#analytics-endpoints)
- [Download Endpoints](#download-endpoints)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [Data Models](#data-models)

## Overview

The fe-portfolio API is built with Next.js API routes and provides endpoints for analytics tracking, file downloads, and authentication.

**Base URL**: `https://your-domain.com/api`

**Content Type**: `application/json`

## Authentication

Some endpoints require authentication. The project uses a simple token-based authentication system for protected routes.

### Authentication Header

```
Authorization: Bearer YOUR_AUTH_TOKEN
```

### Environment Variables

```bash
AUTH_SECRET=your-secret-key
ADMIN_TOKEN=your-admin-token
```

## Analytics Endpoints

### POST /api/analytics

Submit analytics data (errors, performance metrics, user interactions).

#### Request Body

```typescript
interface AnalyticsRequest {
  type: 'error' | 'performance' | 'analytics'
  data: ErrorData | PerformanceData | InteractionData
  timestamp: number
}
```

#### Error Data

```typescript
interface ErrorData {
  message: string
  stack?: string
  url: string
  userAgent: string
  timestamp: number
  sessionId: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  userId?: string
  componentStack?: string
  errorBoundary?: boolean
}
```

#### Performance Data

```typescript
interface PerformanceData {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  timestamp: number
  url: string
  sessionId: string
}
```

#### Interaction Data

```typescript
interface InteractionData {
  event: string
  page: string
  timestamp: number
  sessionId: string
  metadata?: Record<string, any>
}
```

#### Example Request

```bash
curl -X POST https://your-domain.com/api/analytics \
  -H "Content-Type: application/json" \
  -d '{
    "type": "error",
    "data": {
      "message": "Network request failed",
      "url": "https://your-domain.com/",
      "userAgent": "Mozilla/5.0...",
      "timestamp": 1640995200000,
      "sessionId": "session_123",
      "severity": "high"
    },
    "timestamp": 1640995200000
  }'
```

#### Response

```json
{
  "success": true,
  "message": "Analytics data received",
  "id": "analytics_456"
}
```

#### Error Responses

```json
{
  "error": "Invalid request data",
  "details": "Missing required field: type"
}
```

**Status Codes:**

- `200` - Success
- `400` - Bad Request (invalid data)
- `429` - Too Many Requests (rate limited)
- `500` - Internal Server Error

---

### POST /api/analytics/flush

Batch submit analytics data when user leaves the page (uses `navigator.sendBeacon`).

#### Request Body

```typescript
interface FlushRequest {
  sessionId: string
  errors: ErrorData[]
  performance: PerformanceData[]
  interactions: InteractionData[]
  timestamp: number
}
```

#### Example Request

```bash
curl -X POST https://your-domain.com/api/analytics/flush \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "session_123",
    "errors": [...],
    "performance": [...],
    "interactions": [...],
    "timestamp": 1640995200000
  }'
```

#### Response

```json
{
  "success": true,
  "message": "Batch data processed",
  "processed": {
    "errors": 2,
    "performance": 5,
    "interactions": 10
  }
}
```

---

## Download Endpoints

### GET /api/download-cv

Download the CV/resume PDF file with analytics tracking.

#### Query Parameters

- `track` (optional): Whether to track the download (default: true)
- `format` (optional): File format preference (default: 'pdf')

#### Example Request

```bash
curl -X GET "https://your-domain.com/api/download-cv?track=true" \
  -H "Accept: application/pdf"
```

#### Response

**Success (200):**

- Content-Type: `application/pdf`
- Content-Disposition: `attachment; filename="Farhan_Fadhilah_CV.pdf"`
- File content as binary data

**Error (404):**

```json
{
  "error": "CV file not found"
}
```

#### Analytics Tracking

When `track=true`, the download is automatically tracked with the following data:

```typescript
{
  event: 'cv_download',
  metadata: {
    userAgent: 'request.headers.user-agent',
    timestamp: Date.now(),
    format: 'pdf'
  }
}
```

---

### POST /api/download-analytics

Get download analytics data (protected endpoint).

#### Authentication Required

```
Authorization: Bearer YOUR_ADMIN_TOKEN
```

#### Request Body

```typescript
interface DownloadAnalyticsRequest {
  startDate?: string // ISO date string
  endDate?: string // ISO date string
  limit?: number // Max records to return (default: 100)
}
```

#### Example Request

```bash
curl -X POST https://your-domain.com/api/download-analytics \
  -H "Authorization: Bearer your-admin-token" \
  -H "Content-Type: application/json" \
  -d '{
    "startDate": "2024-01-01T00:00:00Z",
    "endDate": "2024-12-31T23:59:59Z",
    "limit": 50
  }'
```

#### Response

```json
{
  "success": true,
  "data": {
    "totalDownloads": 150,
    "downloads": [
      {
        "timestamp": "2024-01-15T10:30:00Z",
        "userAgent": "Mozilla/5.0...",
        "ip": "192.168.1.1",
        "format": "pdf"
      }
    ],
    "summary": {
      "dailyAverage": 12.5,
      "topUserAgents": [
        { "agent": "Chrome", "count": 80 },
        { "agent": "Firefox", "count": 45 }
      ]
    }
  }
}
```

---

### POST /api/auth-analytics

Get comprehensive analytics data (protected endpoint).

#### Authentication Required

```
Authorization: Bearer YOUR_ADMIN_TOKEN
```

#### Request Body

```typescript
interface AuthAnalyticsRequest {
  type?: 'errors' | 'performance' | 'interactions' | 'all'
  startDate?: string
  endDate?: string
  limit?: number
  groupBy?: 'day' | 'week' | 'month'
}
```

#### Example Request

```bash
curl -X POST https://your-domain.com/api/auth-analytics \
  -H "Authorization: Bearer your-admin-token" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "errors",
    "startDate": "2024-01-01T00:00:00Z",
    "limit": 100,
    "groupBy": "day"
  }'
```

#### Response

```json
{
  "success": true,
  "data": {
    "errors": {
      "total": 25,
      "critical": 2,
      "high": 8,
      "medium": 10,
      "low": 5,
      "recentErrors": [...]
    },
    "performance": {
      "averageLoadTime": 1250,
      "coreWebVitals": {
        "CLS": 0.1,
        "FID": 50,
        "LCP": 1200
      }
    },
    "interactions": {
      "totalEvents": 500,
      "topEvents": [
        { "event": "button_click", "count": 150 },
        { "event": "page_view", "count": 200 }
      ]
    }
  }
}
```

---

## Error Handling

All API endpoints follow consistent error handling patterns:

### Error Response Format

```typescript
interface ErrorResponse {
  error: string // Error message
  details?: string // Additional details
  code?: string // Error code
  timestamp?: number // When error occurred
}
```

### Common Error Codes

- `INVALID_REQUEST` - Malformed request data
- `AUTHENTICATION_REQUIRED` - Missing or invalid auth token
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `FILE_NOT_FOUND` - Requested file doesn't exist
- `INTERNAL_ERROR` - Server-side error

### Example Error Response

```json
{
  "error": "Authentication required",
  "details": "Missing Authorization header",
  "code": "AUTHENTICATION_REQUIRED",
  "timestamp": 1640995200000
}
```

## Rate Limiting

API endpoints are protected with rate limiting to prevent abuse:

### Rate Limits

- **Analytics endpoints**: 100 requests per minute per IP
- **Download endpoints**: 10 requests per minute per IP
- **Flush endpoint**: 10 requests per minute per IP
- **Protected endpoints**: 50 requests per minute per IP

### Rate Limit Headers

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995260
```

### Rate Limit Exceeded Response

```json
{
  "error": "Rate limit exceeded",
  "details": "Too many requests, please try again later",
  "retryAfter": 60
}
```

## Data Models

### Session Data

```typescript
interface Session {
  sessionId: string // Unique session identifier
  userId?: string // Optional user identifier
  startTime: number // Session start timestamp
  lastActivity: number // Last activity timestamp
  userAgent: string // Browser user agent
  ip: string // Client IP address
}
```

### Analytics Summary

```typescript
interface AnalyticsSummary {
  totalEvents: number
  totalErrors: number
  totalPerformanceMetrics: number
  averageSessionDuration: number
  topPages: Array<{
    page: string
    views: number
  }>
  errorsByType: {
    critical: number
    high: number
    medium: number
    low: number
  }
}
```

## Security Considerations

### Data Sanitization

All incoming data is sanitized to remove:

- Sensitive information (passwords, tokens, secrets)
- Personal identifiable information (PII)
- Potentially malicious content

### IP Address Handling

- IP addresses are hashed for privacy
- Geographic data is aggregated only
- No personal tracking beyond session scope

### CORS Configuration

```typescript
// Allowed origins for API requests
const allowedOrigins = [
  'https://your-domain.com',
  'https://www.your-domain.com',
]
```

## Development

### Local Development

```bash
# Start development server
npm run dev

# API endpoints available at:
# http://localhost:3000/api/*
```

### Environment Variables

```bash
# Required for production
AUTH_SECRET=your-secret-key
ADMIN_TOKEN=your-admin-token

# Optional for development
NODE_ENV=development
DEBUG_ANALYTICS=true
```

### Testing API Endpoints

```bash
# Run API tests
npm run test:api

# Test specific endpoint
npm run test -- --testPathPattern=api
```

## Monitoring

### Health Check

```bash
curl -X GET https://your-domain.com/api/health
```

Response:

```json
{
  "status": "healthy",
  "timestamp": 1640995200000,
  "version": "1.0.0"
}
```

### Metrics

Key metrics tracked:

- Request volume and response times
- Error rates by endpoint
- Rate limiting effectiveness
- File download statistics

## Support

For API support or questions:

- Email: support@your-domain.com
- Documentation: https://your-domain.com/docs
- Status Page: https://status.your-domain.com
