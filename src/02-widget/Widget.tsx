import { useState, useEffect } from 'react'

import './widget.css'

export const Widget = () => {
  const [height, setHeight] = useState('')

  useEffect(() => {
    addEventListener('message', (messageEvent: MessageEvent<MessageEventData>) => {
      const { type, height } = messageEvent.data;
      if (type === 'sizeChange' && height) {
        setHeight(`${height}px`)
      }
    })
  })

  return (
    <div className="widget">
      <h1>App content</h1>
      <p>Check out our latest podcast</p>
      {<div
        style={{
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <iframe
          height={height}
          width={'100%'}
          src="/iframe"
          style={{
            border: 0,
          }}
        />
      </div>}
    </div>
  )
}
