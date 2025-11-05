export default function HashBlock({ md5, sha256 }) {
    return (
    <div className="grid gap-2">
    <div className="text-sm"><span className="font-semibold">MD5:</span> <span className="break-all">{md5}</span></div>
    <div className="text-sm"><span className="font-semibold">SHA-256:</span> <span className="break-all">{sha256}</span></div>
    </div>
    );
    }