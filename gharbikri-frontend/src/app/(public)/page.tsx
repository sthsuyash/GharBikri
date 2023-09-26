import Link from "next/link";

const getData = async () => {
    const res = await fetch('https://fakestoreapi.com/products/categories')
    const data = await res.json()
    return data
}

export default async function Home() {
    const data = await getData()

    return (
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
            <h1 className="text-6xl font-bold">
                Welcome to{' '}
                <Link className="text-blue-600" href="https://nextjs.org">
                    Gharbikri!
                </Link>
            </h1>
            <div>
                {
                    data.map((item: any) => {
                        return (
                            <div key={item}>
                                <p>{item}</p>
                            </div>
                        )
                    }
                    )
                }
            </div>

        </main>
    )
}
