import React, { useEffect, useLayoutEffect } from 'react'
import { PillData } from './data'
import { Pill } from './Pill'
import debounce from 'lodash/debounce';

interface PillsProps {
  pills: PillData[]
  headers: PillData['id'][]
  toggleHeader: (id: string) => void
}

interface LayoutBreakElement {
  index: PillData['id']
  type: 'line-break'
}

interface LayoutPillElement {
  index: PillData['id']
  type: 'pill'
  pill: PillData
}

type LayoutElement = LayoutBreakElement | LayoutPillElement

type State = {
  layoutElements: LayoutElement[],
  isRecalculating: boolean;
}

const mapIntialLayoutElements = (pill: PillData): LayoutElement => ({
  index: pill.id,
  type: 'pill',
  pill: pill,
})

export function Pills({ pills, headers, toggleHeader }: PillsProps) {
  const pillRefs = React.useRef<{ [id: PillData['id']]: HTMLDivElement }>({})
  const [state, setState] = React.useState<State>({
    layoutElements: pills.map(mapIntialLayoutElements),
    isRecalculating: true,
  });

  const recalculateLayout = () => {
    let currentLineTop = pillRefs.current[pills[0].id].getBoundingClientRect().top;
    const newLayoutElements: LayoutElement[] = [];

    pills.forEach(pill => {
      const pillNode = pillRefs.current[pill.id];
      if (!pillNode) {
        return;
      }

      const pillRect = pillNode.getBoundingClientRect();
      const isNewLine = pillRect.top > currentLineTop;
      if (isNewLine) {
        currentLineTop = pillRect.top;
        newLayoutElements.push({
          index: `__break-${pill.id}`,
          type: 'line-break',
        });
      }

      newLayoutElements.push({
        index: pill.id,
        type: 'pill',
        pill: pill,
      });
    })

    setState({
      ...state,
      layoutElements: newLayoutElements,
      isRecalculating: false,
    })
  }


  useLayoutEffect(() => {
    setState({
      ...state,
      layoutElements: pills.map(mapIntialLayoutElements),
      isRecalculating: true,
    })

    setTimeout(() => {
      recalculateLayout();
    }, 0)

  }, [pills]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleResize = debounce(() => {
      setState({
        ...state,
        isRecalculating: true,
      })

      timer = setTimeout(() => {
        recalculateLayout();
      }, 0)

      return () => clearTimeout(timer);
    }, 100);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);


  const setPillRef = (id: PillData['id'], node: HTMLDivElement) => {
    if (node) {
      pillRefs.current[id] = node
    }
  }

  return (
    <div style={{ visibility: state.isRecalculating ? 'hidden' : 'visible' }}>
      {
        state.layoutElements.map(el => {
          if (el.type === 'line-break') {
            return <br key={`__${el.type}-${el.index}`} />
          } else {
            return (
              <Pill
                key={el.pill.id}
                header={state.isRecalculating || headers.includes(el.pill.id)}
                onClick={() => {
                  toggleHeader(el.pill.id)
                }}
                ref={element => element && setPillRef(el.pill.id, element)}
              >
                {el.pill.value}
              </Pill>
            )
          }
        })
      }
    </div >
  )
}