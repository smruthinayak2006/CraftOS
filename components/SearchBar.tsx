"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({
  value,
  onChange,
}: Props) {
  return (
    <div className="mt-10">

      <div className="relative">

        <input
          type="text"
          placeholder="Search projects..."
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 pl-12 text-white outline-none transition focus:border-blue-500"
        />

        <div className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500">
          🔍
        </div>

      </div>

    </div>
  );
}