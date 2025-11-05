export default function MetadataTable({ metadata }) {
    const entries = Object.entries(metadata || {});
    if (!entries.length) return <div className="text-sm text-slate-500">No EXIF metadata found.</div>;
    return (
    <div className="max-h-64 overflow-auto border rounded-lg bg-white">
    <table className="w-full text-sm">
    <tbody>
    {entries.map(([k, v]) => (
    <tr key={k} className="odd:bg-slate-50">
    <td className="p-2 font-medium align-top w-48">{k}</td>
    <td className="p-2 break-all">{String(v)}</td>
    </tr>
    ))}
    </tbody>
    </table>
    </div>
    );
    }