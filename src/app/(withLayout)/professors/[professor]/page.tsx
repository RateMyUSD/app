export default function Page({
  params,
}: Readonly<{ params: { professor: string } }>) {
  return <div>{params.professor}</div>;
}
