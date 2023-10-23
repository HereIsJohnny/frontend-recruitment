export const Instructions = () => {
  return (
    <div style={{ margin: '8px' }}>
      <h3>Intro</h3>
      <p>
        Underneath the horizontal line you see widget where we promote our content. Inside the
        widget we have an iframe that displays content from our marketing site. Widget and the
        included iframe are build to be responsive.
      </p>
      <h3>Problem</h3>
      <p>
        Content in our iframe is dynamic and have different height depending on the iframe width.
        This means that we have to dynamically set the iframe height to match the height of it's
        content.
      </p>
      <h4>How can you reproduce that?</h4>
      <p>
        With big screen width the iframe height currently is 117px and that's the value we set
        manually. However with small screen width (600px) the iframe height is bigger and we see
        scrollbars or content being cut in the iframe.
      </p>
      <h3>Requirements</h3>
      <ul>
        <li>
          when you open content on different screen width whole iframe content should be visible
          without scrollbars
        </li>
        <li>
          iframe is currently from the same origin, but the solution should work also for cross
          origin iframe. That means that you can't access internals (eg. document, window) of iframe
          from the widget itself.
        </li>
        <li>
          iframe should not "flicker" on initial render (showing for a fraction of second iframe
          with incorrect width/height)
        </li>
        <li>
          developer who worked on this task left the code a bit sloppy. Try to improve it in areas
          like TypeScript and good React practices.
        </li>
        <li>
          <b>extra</b>: when you dynamically change screen width iframe width and height should
          adjust accordingly
        </li>
      </ul>
      <h3>Tips</h3>
      <ul>
        <li>
          use <code>parent.postMessage</code> to communicate from iframe to widget
        </li>
      </ul>

      <h3 style={{ textDecoration: 'underline' }}>Notes from Candidate</h3>
      <ul>
        <li>
          I have reset the margin on the {"<body>"} element to avoid scrollbars when the iframe is in the same domain. Additionally, I think it's a realistic assumption that CSS will include a reset.
        </li>
      </ul>
    </div>
  )
}
