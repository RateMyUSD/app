export default function Page({ params }: Readonly<{ params: { id: string } }>) {
  return <div>{params.id}</div>;
}
