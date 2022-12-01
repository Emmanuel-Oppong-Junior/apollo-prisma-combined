-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "deleted_at" DROP NOT NULL,
ALTER COLUMN "deleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Comments" ALTER COLUMN "deleted_at" DROP NOT NULL,
ALTER COLUMN "deleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "deleted_at" DROP NOT NULL,
ALTER COLUMN "deleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "deleted" DROP NOT NULL,
ALTER COLUMN "deleted_at" DROP NOT NULL;
