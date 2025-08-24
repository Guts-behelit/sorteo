import { useRef } from "react"
import { useUserStore } from "../../store/userStore"
import boletoImage from "../../../public/img/boleto.png"

export default function Email() {
  const user = useUserStore((state) => state.dataUser)
  const contenidoRef = useRef(null)

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

  return (
    <>
    <div
      ref={contenidoRef}
      id="contenido"
      contentEditable={false}
      style={{
        width: "100%",
        maxWidth: "750px",
        margin: "20px auto",
        padding: "30px 25px",
        backgroundColor: "#ffffff",
        borderRadius: "20px",
        boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.08)",
        fontFamily: "Arial, Helvetica, sans-serif",
        lineHeight: "1.6",
        color: "#222",
        boxSizing: "border-box",
      }}
    >
      <img
        src={boletoImage}
        alt="Ticket"
        style={{
          width: "100%",
          borderRadius: "16px",
          marginBottom: "20px",
          objectFit: "cover",
        }}
      />

      <h2
        style={{
          fontSize: "1.6rem",
          fontWeight: "700",
          color: "#111",
          marginBottom: "15px",
          textAlign: "center",
        }}
      >
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
      <ul style={{ margin: "12px 0 18px 20px", padding: 0 }}>
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
        Adjunto a este correo encontrarás tu(s) ticket(s) en formato PDF o
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
    <div style={{ textAlign: "center", marginTop: "25px" }}>
        <button
          onClick={copiarContenido}
          style={{
            backgroundColor: "#ff007a",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1rem",
            padding: "12px 24px",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            transition: "background 0.2s ease-in-out",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#e6006f")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#ff007a")
          }
        >
          Copiar Correo
        </button>
      </div>
    </>
    
  )
}


