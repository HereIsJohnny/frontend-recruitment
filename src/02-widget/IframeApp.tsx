import React, { useEffect } from 'react'
import throttle from 'lodash/throttle';

export const IframeApp = () => {
  const iframeContainerRef = React.useRef<HTMLDivElement>(null);
  const iframeHeightCacheRef = React.useRef<number>(0);

  useEffect(() => {
    const handleResize = () => {
      const iframe = iframeContainerRef.current;
      if (!iframe) {
        return;
      }

      const newHeight = iframe.getBoundingClientRect().height;
      if (newHeight !== iframeHeightCacheRef.current) {
        iframeHeightCacheRef.current = newHeight;
        parent.postMessage({ type: 'sizeChange', height: newHeight }, '*');
      }
    };

    handleResize();

    const throttledHandleResize = throttle(handleResize, 50);

    window.addEventListener('resize', throttledHandleResize);

    return () => {
      window.removeEventListener('resize', throttledHandleResize);
    }
  }, [])

  return (
    <div
      ref={iframeContainerRef}
      style={{
        backgroundColor: 'rebeccapurple',
        color: 'white',
        padding: '2rem',
        borderRadius: '1rem',
        fontSize: '2rem',
      }}
    >
      Dynamic marketing content will be here
    </div>
  )
}
