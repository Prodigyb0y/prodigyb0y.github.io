import sys, subprocess, os
from playwright.sync_api import sync_playwright
SC = {"s1":(0,10),"s2":(10,25),"s3":(35,20),"s4":(55,25),"s5":(80,25),"s6":(105,15)}
FPS = 30
def open_page(p):
    b = p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox","--allow-file-access-from-files"])
    pg = b.new_page(viewport={"width":1920,"height":1080})
    pg.goto("file://" + os.path.abspath("video.html") + ""); pg.evaluate("window.ready")
    return b, pg
if sys.argv[1] == "preview":
    times = [float(x) for x in sys.argv[2:]]
    with sync_playwright() as p:
        b, pg = open_page(p)
        for t in times:
            pg.evaluate(f"setT({t})"); pg.screenshot(path=f"prev_{t}.png")
        b.close()
else:
    sid = sys.argv[1]; start, dur = SC[sid]
    n = int(dur*FPS); tmp = f"scene_{sid}.tmp.mp4"
    ff = subprocess.Popen(["ffmpeg","-y","-loglevel","error","-f","image2pipe","-framerate",str(FPS),"-c:v","mjpeg","-i","-",
        "-c:v","libx264","-crf","18","-preset","veryfast","-pix_fmt","yuv420p","-r",str(FPS),tmp], stdin=subprocess.PIPE)
    with sync_playwright() as p:
        b, pg = open_page(p)
        for i in range(n):
            pg.evaluate(f"setT({start + i/FPS})")
            ff.stdin.write(pg.screenshot(type="jpeg", quality=92))
        b.close()
    ff.stdin.close(); rc = ff.wait()
    if rc == 0: os.rename(tmp, f"scene_{sid}.mp4"); print("ok", sid, n, "frames")
    else: print("ffmpeg failed", rc)
