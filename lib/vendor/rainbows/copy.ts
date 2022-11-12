import { promises as fs } from "fs";
import path from "path";
export const copy = async (src: string, dest: string) => {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    entry.isDirectory()
      ? await copy(srcPath, destPath)
      : await fs.copyFile(srcPath, destPath);
  }
};
