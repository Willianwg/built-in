import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.end(`
        <div>
            <h3>
                Stream
            </h3>

            <iframe allow="autoplay" src="http://localhost:3000/video" />
        </div>
        `)
    } else if (req.url === "/video") {
        const totalVideoSize = fs.statSync("./video.mp4").size;
        const range = req.headers.range;

        if (!range) {
            const video = fs.createReadStream("./video.mp4");
            res.writeHead(200, {
                "Content-Type": "video/mp4",
                "Accept-Ranges": "bytes"
            })

            video.pipe(res);
        } else {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : totalVideoSize - 1;
            const video = fs.createReadStream("./video.mp4", { start, end });

            res.writeHead(206, {
                "Content-Type": "video/mp4",
                "Accept-Ranges": "bytes",
                "Content-Range": `bytes ${start}-${end}/${totalVideoSize}`
            })

            video.pipe(res);

        }

    } else if (req.url === "/static") {
        res.end(`
        <div>
            <h3>
                Static
            </h3>

            <iframe allow="autoplay" src="http://localhost:3000/video-static" />
        </div>
    `)
    } else if (req.url === "/video-static") {
        const video = fs.readFileSync("./video.mp4");
        res.writeHead(200, {
            "Content-Type": "video/mp4"
        })

        res.end(video);

    } else {
        res.end('404 Page Not Found');
    }
})

server.listen(3000);