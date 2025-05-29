import ListContainer from "@/components/ListContainer";
export default async function Home() {


  return (
    <div className=" items-center justify-items-center min-h-screen p-8 pb-20 gap-16  font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center ">
        <ListContainer />
      </main>
    </div>
  );
}




