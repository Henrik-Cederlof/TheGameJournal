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
      className="flex flex-row no-scrollbar w-screen pb-4 hover:bg-black/20 transition-colors duration-300 ease-in-out overflow-x-scroll"
      >
        {children}
      </div>
  );
}

export default SideScroll;