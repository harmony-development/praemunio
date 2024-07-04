export async function* messages() {
	while (true) {
		const response = await fetch("http://localhost:8192/messages")

		if (response.status === 502) {
			continue
		} else if (response.status !== 200) {
			await new Promise(resolve => setTimeout(resolve, 1000))
			continue
		} else {
			const msg = await response.json()
			yield msg.text
		}
	}
}

export async function send(body: string) {
	await fetch("http://localhost:8192/messages", {
		method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: body })
	})
}
