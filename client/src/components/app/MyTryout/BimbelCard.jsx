export default function BimbelCard() {
  return (
    <div>
      <p>Bibmel Card</p>
      <div className="border rounded-xl">
        <div className="grid grid-cols-3 ">
          <div className="col-span-2">
            <p>Iamge</p>
          </div>
          <div className="flex flex-col justify-between p-4">
            <div>
              <p className="font-bold">Bimbel SKB</p>
            </div>
            <div className="mt-14">
              <p>1-5 November 2024</p>
              <p className="font-bold">SKB</p>
              <button className="bg-[#FFCB01] rounded-lg py-2 px-10">Link Group Whatsapp</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
