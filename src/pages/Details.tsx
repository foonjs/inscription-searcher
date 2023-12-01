import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import NavigationBar from "../components/NavigationBar"

interface InscriptionParams {
	id: string
	number: number
	address: string
	genesis_address: string
	genesis_block_height: number
	genesis_block_hash: string
	genesis_tx_id: string
	genesis_fee: number
	genesis_timestamp: number
	location: string
	output: string
	offset: number
	sat_ordinal: number
	sat_rarity: string
	sat_coinbase_height: number
	mime_type: string
	content_type: string
	content_length: number
	tx_id: string
	timestamp: number
	value: number
}

const Details = () => {
	const { address, id } = useParams()
	const [inscriptionDetails, setInscriptionDetails] = useState<
		InscriptionParams | undefined
	>(undefined)

	const fetchInscriptionDetails = async () => {
		try {
			const response = await fetch(
				`https://api-3.xverse.app/v1/address/${address}/ordinals/inscriptions/${id}`
			)

			if (!response.ok) {
				throw new Error("Failed to fetch data")
			}

			const result: InscriptionParams = await response.json()
			setInscriptionDetails(result)
			console.log(result)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchInscriptionDetails()
	}, [])
	return (
		<>
			<NavigationBar title="Details" showBackButton />
			{/* <img /> */}
			<div>{`Inscription ${inscriptionDetails?.number}`}</div>
			<div>Inscription ID</div>
			<div>{inscriptionDetails?.tx_id}</div>
			<div>Owner Address</div>
			<div>{inscriptionDetails?.genesis_address}</div>

			<div>Attributes</div>
			<div>Output Value</div>
			<input readOnly value={inscriptionDetails?.value}></input>
			<div>Content Type</div>
			<input readOnly value={inscriptionDetails?.content_type}></input>
			<div>Content Length</div>
			<input readOnly value={inscriptionDetails?.content_length}></input>
			<div>Location</div>
			<input readOnly value={inscriptionDetails?.location}></input>
			<div>Genesis Transaction</div>
			<input readOnly value={inscriptionDetails?.tx_id}></input>
		</>
	)
}

export default Details
