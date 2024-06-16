-- CreateTable
CREATE TABLE "PaidList" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "tryoutListId" INTEGER NOT NULL,

    CONSTRAINT "PaidList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaidList_userId_tryoutListId_key" ON "PaidList"("userId", "tryoutListId");

-- AddForeignKey
ALTER TABLE "PaidList" ADD CONSTRAINT "PaidList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaidList" ADD CONSTRAINT "PaidList_tryoutListId_fkey" FOREIGN KEY ("tryoutListId") REFERENCES "TryoutList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
