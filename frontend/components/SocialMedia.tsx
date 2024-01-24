interface SocialMediaProps {
    id: number,
    type: string,
    link: string
}
export default function SocialMedia({id, type, link} : SocialMediaProps) {
    return (
        <div className="border rounded p-2 mb-2">
            <h3>{type}</h3>
            <p>{link}</p>
        </div>
    )
}