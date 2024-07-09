const transactions = [
  {
    id: 1,
    amount: 100
  },
  {
    id: 2,
    amount: 200

  }
]

function getRandomInt() {
  return Math.floor(Math.random() * 100);
}

export async function POST(request: Request) {
  const body = await request.json();

  const amount = body.amount;

  const newId = getRandomInt();

  transactions.push({ id: newId, amount: amount })

  return Response.json({ transactionId: newId, success: true })
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const id = searchParams.get("id");

  if (!id) {
    return Response.json({ message: "Not found" }, { status: 404 });
  }
  const transaction = transactions.find((transaction) => transaction.id === parseInt(id));
  return Response.json(transaction);
}