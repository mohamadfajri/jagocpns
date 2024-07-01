-- CreateTable
CREATE TABLE "FreeForm" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "tryoutListId" INTEGER NOT NULL,

    CONSTRAINT "FreeForm_pkey" PRIMARY KEY ("id")
);
