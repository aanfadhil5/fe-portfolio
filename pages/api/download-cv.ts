import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Path to your CV file
    const cvPath = path.join(
      process.cwd(),
      "public",
      "cv",
      "Farhan_Fadhilah_CV.pdf"
    );

    // Check if file exists
    if (!fs.existsSync(cvPath)) {
      return res.status(404).json({ message: "CV file not found" });
    }

    // Get file stats
    const stat = fs.statSync(cvPath);

    // Set headers for file download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Farhan_Fadhilah_CV.pdf"'
    );
    res.setHeader("Content-Length", stat.size);

    // Optional: Add CORS headers if needed
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");

    // Stream the file
    const fileStream = fs.createReadStream(cvPath);
    fileStream.pipe(res);

    // Optional: Log download (you can extend this to save to database)
    console.log(
      `CV downloaded at ${new Date().toISOString()} from IP: ${
        req.headers["x-forwarded-for"] || req.connection.remoteAddress
      }`
    );
  } catch (error) {
    console.error("Error serving CV:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
