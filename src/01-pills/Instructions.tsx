export const Instructions = () => {
  return (
    <div style={{ margin: '8px' }}>
      <h3>Intro</h3>
      <p>
        Underneath the horizontal line you see a number of pills. Each button can be toggled to mark
        its importance. Go ahead and click one. You will notice that the "H" appears on that pill.
        You can toggle any number of pills.
      </p>
      <h3>Problem</h3>
      <p>
        When we toggle pills sometimes they are not able to fit on the same line and the last pill
        in the line is moved to the next line. We don't like this sudden layout change and we would
        like to lay out all the pills at the beginning in a way that they won't move between lines
        when toggled.
      </p>
      <h3>Requirements</h3>
      <ul>
        <li>
          designers didn't allow to make the pill same width in toggled on and toggled off state. It
          will always be wider when toggled on.
        </li>
        <li>
          we want to have minimal number of pills lines as possible. We can't reserve hardcoded eg.
          25% of line width for the wider buttons, because that would probably waste some space.
        </li>
        <li>pill will never ever change line during pills toggling</li>
        <li>spacing between pills should be consistent</li>
        <li>
          ideally only make changes in <code>Pills.tsx</code> file
        </li>
        <li>
          <b>extra</b>: on browser window resize the pills layout will be updated to optimally use
          the new container width
        </li>
      </ul>

      <h3 style={{ textDecoration: 'underline' }}>Notes from Candidate</h3>
      <ul>
        <li>
          I assume that we want to display pills in the order they are provided, and that we don't want to reorder them to optimize the layout.
        </li>
      </ul>
    </div>
  )
}
