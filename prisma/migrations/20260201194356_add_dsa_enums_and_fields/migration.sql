/*
  Warnings:

  - Added the required column `difficulty` to the `DsaProblem` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `DsaSubmission` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('PENDING', 'RUNNING', 'ACCEPTED', 'WRONG_ANSWER', 'TLE', 'MLE', 'RUNTIME_ERROR', 'COMPILE_ERROR');

-- AlterTable
ALTER TABLE "DsaProblem" ADD COLUMN     "difficulty" "Difficulty" NOT NULL;

-- AlterTable
ALTER TABLE "DsaSubmission" DROP COLUMN "status",
ADD COLUMN     "status" "SubmissionStatus" NOT NULL;
