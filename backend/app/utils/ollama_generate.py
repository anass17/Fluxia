import requests

def ollama_generate(
    prompt: str,
    ollama_url: str,
    model: str,
    temperature: int = 0.2,
    max_tokens: int = 256,
) -> str:
    response = requests.post(
        ollama_url,
        json={
            "model": model,
            "prompt": prompt,
            "stream": False,
            "options": {"temperature": temperature, "num_predict": max_tokens},
        },
        timeout=120,
    )
    response.raise_for_status()
    return response.json()["response"]