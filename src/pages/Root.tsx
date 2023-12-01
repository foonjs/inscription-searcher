import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ArrowRight from "../assets/images/arrow_right.svg"
import NavigationBar from "../components/NavigationBar.tsx"
import "../index.css"

interface InscriptionParams {
	txid: string
	vout: number
	block_height: number
	value: number
	sats: any[]
	inscriptions: {
		id: string
		offset: number
		content_type: string
	}[]
}

const Root = () => {
	const [address, setAddress] = useState<string>("")
	const [list, setList] = useState<Array<InscriptionParams> | []>([])
	const navigate = useNavigate()
	const { address: urlAddress } = useParams()

	const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value
		setAddress(value)
	}

	const handleSubmit = () => {
		navigate(`/${address}`)
	}

	const handleNextButton = (inscription: InscriptionParams) => {
		// set selected inscription ? or pass id as param to be called in API in /details
		console.log(inscription)
		const {
			txid,
			inscriptions: [{ id }],
		} = inscription
		navigate(`/details/${txid}/${id}`)
	}

	const fetchInscriptionData = async () => {
		try {
			const response = await fetch(
				`https://api-3.xverse.app/v1/address/${address}/ordinal-utxo`
			)

			if (!response.ok) {
				throw new Error("Failed to fetch data")
			}

			// const data: InscriptionParams = await response.json()
			const { results }: Array<InscriptionParams> = await response.json()

			setList(results)
		} catch (error) {
			console.error(error)
		}
	}

	const getInscriptionLabel = (address: string) => {
		return `Inscription ${address.slice(0, 9)}`
	}
	useEffect(() => {
		// call API here
		if (!urlAddress) return
		console.log(urlAddress)
		fetchInscriptionData().then()
	}, [urlAddress])

	return (
		<>
			<NavigationBar title="Ordinals Inscription Lookup" />
			<div id="search-section" className="search-section">
				<div>Owner Bitcoin Address:</div>
				<input
					id="inscription-input"
					type="search"
					onChange={handleInput}
				/>
				<button onClick={handleSubmit}>Look up</button>
			</div>
			<div id="inscription-listing" className="inscription-listing">
				<div>{list.length > 0 && "Results"}</div>
				{list?.map((inscription, idx) => (
					<div key={idx} className="inscription-listing-button">
						<div>{getInscriptionLabel(inscription.txid)}</div>
						<img
							src={ArrowRight}
							onClick={() => handleNextButton(inscription)}
							className=""
						/>
					</div>
				))}
			</div>
		</>
	)
}

export default Root
