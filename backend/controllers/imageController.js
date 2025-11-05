export async function compareImages(req, res) {
    if (!req.files || req.files.length !== 2) {
      return res.status(400).json({ error: "Please upload two images." });
    }
  
    const [file1, file2] = req.files;
  
    try {
      const hash1 = fileHash(file1.path, "md5");
      const hash2 = fileHash(file2.path, "md5");
  
      const identical = hash1 === hash2;
  
      res.json({
        identical,
        hash1,
        hash2,
      });
    } catch (error) {
      res.status(500).json({ error: "Comparison failed." });
    } finally {
      try { fs.unlinkSync(file1.path); } catch {}
      try { fs.unlinkSync(file2.path); } catch {}
    }
  }
  