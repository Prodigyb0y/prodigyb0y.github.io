import sys, subprocess, os
from playwright.sync_api import sync_playwright
FPS = 30
slug = sys.argv[1]; mode = sys.argv[2] if len(sys.argv) > 2 else "render"
with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox","--allow-file-access-from-files"])
    pg = b.new_page(viewport={"width":1920,"height":1080})
    pg.goto("file://" + os.path.abspath("pv.html") + "")
    total = pg.evaluate(f"load('{slug}')")
    if mode == "preview":
        for t in [float(x) for x in sys.argv[3:]]:
            pg.evaluate(f"setT({t})"); pg.screenshot(path=f"prev/{slug}_{t}.png")
        print("total", total)
    else:
        n = int(total*FPS); tmp = f"out/{slug}.tmp.mp4"
        ff = subprocess.Popen(["ffmpeg","-y","-loglevel","error","-f","image2pipe","-framerate",str(FPS),"-c:v","mjpeg","-i","-","-c:v","libx264","-crf","18","-preset","veryfast","-pix_fmt","yuv420p","-r",str(FPS),"-movflags","+faststart",tmp], stdin=subprocess.PIPE)
        for i in range(n):
            pg.evaluate(f"setT({i/FPS})"); ff.stdin.write(pg.screenshot(type="jpeg", quality=92))
        ff.stdin.close(); rc = ff.wait()
        if rc == 0: os.rename(tmp, f"out/{slug}.mp4"); print("ok", slug, total, "s")
        else: print("ffmpeg failed", rc)
    b.close()
