import { useEffect, useRef } from "react"


const SideScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current;
    if(!el) return;

    const mouseWheel = (e: WheelEvent) => {
      e.preventDefault();
      const scrollSpeed = 1;
      el.scrollTo({
        left: el.scrollLeft + e.deltaY * scrollSpeed,
      });
    };
    
    el.addEventListener("wheel", mouseWheel, {passive: false});

    return () => {
      el.removeEventListener("wheel", mouseWheel);
    };
  }, []);

  return(
    <div
      ref={scrollRef}
      className="grid grid-rows-1 auto-cols-[minmax(200px,1fr)] py-5 grid-flow-col gap-15 no-scrollbar w-screen pb-4 hover:bg-black/20 transition-colors duration-300 ease-in-out overflow-x-scroll"
>
        {children}
      </div>
  );
}

export default SideScroll;