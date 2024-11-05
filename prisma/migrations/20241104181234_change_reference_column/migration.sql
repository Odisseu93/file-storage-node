/*
  Warnings:

  - You are about to drop the column `reference` on the `Files` table. All the data in the column will be lost.
  - Added the required column `refId` to the `Files` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Files" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fileName" TEXT NOT NULL,
    "originalFileName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "refId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Files" ("category", "createdAt", "fileName", "id", "mimeType", "originalFileName") SELECT "category", "createdAt", "fileName", "id", "mimeType", "originalFileName" FROM "Files";
DROP TABLE "Files";
ALTER TABLE "new_Files" RENAME TO "Files";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
