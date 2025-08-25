import { useRef } from "react"
import { useUserStore } from "../../store/userStore"
import boletoImage from "../../../public/img/boleto.png"
import html2canvas from "html2canvas"

export default function Email() {
  const user = useUserStore((state) => state.dataUser)
  const contenidoRef = useRef(null)

  // ✅ Copiar contenido como HTML o texto plano
  const copiarContenido = () => {
    const contenido = contenidoRef.current
    if (!contenido) return

    if (navigator.clipboard && window.ClipboardItem) {
      const blobInput = new Blob([contenido.innerHTML], { type: "text/html" })
      const data = [new ClipboardItem({ "text/html": blobInput })]

      navigator.clipboard
        .write(data)
        .then(() => {
          alert("✅ Contenido copiado con formato. Ahora pégalo en tu correo.")
        })
        .catch(() => {
          alert("❌ Error al copiar. Intenta de nuevo.")
        })
    } else {
      const text = contenido.innerText
      navigator.clipboard.writeText(text).then(() => {
        alert("📋 Contenido copiado en texto plano. Ahora pégalo en tu correo.")
      })
    }
  }

  // ✅ Screenshot de la sección del correo
  const capturarSeccion = async () => {
    const contenido = contenidoRef.current
    if (!contenido) return

    try {
      const canvas = await html2canvas(contenido, { scale: 2 }) // mejor resolución
      const imgData = canvas.toDataURL("image/png")

      // Crear enlace de descarga
      const link = document.createElement("a")
      link.href = imgData
      link.download = "mi_correo.png"
      link.click()
    } catch (error) {
      console.error(error)
      alert("❌ Error al capturar la imagen.")
    }
  }

  return (
    <>
    <div
      ref={contenidoRef}
      id="contenido"
      style={{
        width: "100%",
        maxWidth: "800px",
        padding: "20px 10px",
        marginTop: "20px",
        backgroundColor: "white",
        boxSizing: "border-box",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
      contentEditable={false}
    >
      <img
        src={boletoImage}
        alt="Ticket"
        style={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "16px",
        }}
      />
      <h2 style={{ color: "#2C3E50", marginBottom: "12px" }}>
        🎉 ¡Tu participación ha sido confirmada!
      </h2>

      <p>
        Hola <strong>{user.full_name}</strong>,
      </p>
      <p>
        Gracias por participar en la promoción{" "}
        <strong>Carnaval de Premios</strong> de{" "}
        <strong>Delícias da Rih</strong>.
      </p>
      <p>Ya estás participando oficialmente por los siguientes premios:</p>
      <ul>
        <li>Una máquina de afeitar</li>
        <li>Una sandwichera</li>
        <li>Una batidora</li>
        <li>Un ventilador</li>
        <li>Una licuadora</li>
      </ul>
      <p>
        <strong>🎫 Tus tickets:</strong> [#12345, #12346]
      </p>
      <p>
        <strong>📅 Fecha de registro:</strong> [08/08/2025]
      </p>
      <p>
        Adjuntos a este correo encontrarás tu(s) ticket(s) en formato PDF o
        imagen. Guárdalos bien, ya que son tu comprobante de participación.
      </p>
      <p>
        📢 <strong>Recuerda:</strong> La promoción es válida durante todo el mes
        de febrero para compras mayores a R$ 10,00. El sorteo se realizará al
        finalizar la promoción y los ganadores serán anunciados en nuestras
        redes sociales.
      </p>
      <p>
        ¡Te deseamos mucha suerte! 🍀
        <br />
        <strong>Equipo Delícias da Rih</strong>
      </p>
    </div>
     {/* Botones */}
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button
          onClick={copiarContenido}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#3498db",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Copiar Correo
        </button>

        <button
          onClick={capturarSeccion}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#27ae60",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Capturar Imagen
        </button>
      </div>
    </>
  )
}


