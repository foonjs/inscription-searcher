import ArrowRight from "../assets/images/arrow_right.svg"
import { useNavigate } from "react-router-dom"
import "../index.css"

interface NavigationBarProps {
	title: string
	showBackButton?: boolean
}

const NavigationBar: React.FC<NavigationBarProps> = (props) => {
	const navigate = useNavigate()
	const handleBackButton = () => {
		navigate(-1)
	}

	return (
		<>
			<div>
				{props.showBackButton && (
					<img
						src={ArrowRight}
						onClick={handleBackButton}
						className="back-button__inverted"
					/>
				)}
				<h1>{props.title}</h1>
			</div>
		</>
	)
}

export default NavigationBar
