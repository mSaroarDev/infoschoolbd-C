export default function PageHeader({ icon, text }) {
  return (
    <>
      <h1 className="text-[18px] font-bold flex items-center gap-2">
        {icon}
        <span>{text}</span>
      </h1>
    </>
  );
}
