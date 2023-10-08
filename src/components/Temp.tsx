import './Temp.css'

interface Props {
    className?: string
}
export default function Temp({ className }: Props) {

    return (
        <div className={className}>
            <p>PLACEHOLDER</p>
        </div>
    )
}