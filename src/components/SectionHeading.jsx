export default function SectionHeading({ id, kicker, title, note }) {
  return (
    <div className="section-heading">
      <div>
        <p className="kicker">{kicker}</p>
        <h2 id={id}>{title}</h2>
      </div>
      {note && <p className="section-note">{note}</p>}
    </div>
  )
}
