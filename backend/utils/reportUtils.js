export function renderTextReport({ when, fileName, mimetype, size, md5, sha256, metadata }) {
    const lines = [];
    lines.push('DIGITAL IMAGE FORENSIC REPORT');
    lines.push('================================');
    lines.push(`Timestamp: ${when}`);
    lines.push('');
    lines.push('BASIC INFO');
    lines.push(`File Name : ${fileName}`);
    lines.push(`MIME Type : ${mimetype}`);
    lines.push(`Size (bytes): ${size}`);
    lines.push('');
    lines.push('HASHES');
    lines.push(`MD5 : ${md5}`);
    lines.push(`SHA256: ${sha256}`);
    lines.push('');
    lines.push('EXIF METADATA');
    if (metadata && Object.keys(metadata).length) {
    for (const [k, v] of Object.entries(metadata)) {
    lines.push(`${k}: ${v}`);
    }
    } else {
    lines.push('No EXIF metadata found.');
    }
    lines.push('');
    return lines.join('\n');
    }