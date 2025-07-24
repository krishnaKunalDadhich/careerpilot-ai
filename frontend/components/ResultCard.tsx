// components/ResultCard.tsx
type Props = {
  title: string;
};

export default function ResultCard({ title }: Props) {
  return (
    <div className="p-3 bg-blue-100 rounded shadow-sm">
      <p>{title}</p>
    </div>
  );
}
