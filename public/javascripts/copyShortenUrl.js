function copyShortenUrl() {
  const copyText = document.getElementById('shorten-url')
  copyText.select()
  navigator.clipboard.writeText(copyText.value)
  alert(`Your link「${copyText.value}」was Copied！`)
}