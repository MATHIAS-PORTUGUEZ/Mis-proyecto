import { useEffect, useState, useRef } from 'react'
import './Reservations.css'

export const Reservations = () => {
    const [reservas, setReservas] = useState([])
    const [form, setForm] = useState({
        nombre: '',
        email: '',
        fecha: '',
        hora: '',
        personas: '',
        notas: ''
    })
    const [errors, setErrors] = useState({})
    const [notice, setNotice] = useState('')
    const firstFieldRef = useRef(null)

    // fecha mínima: hoy (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0]

    // horario de atención y generación de franjas cada 30 minutos (solo opciones seleccionables)
    const minTime = '12:00'
    const maxTime = '22:00'
    const generateTimes = (start, end, stepMinutes = 30) => {
        const times = []
        const [sh, sm] = start.split(':').map(Number)
        const [eh, em] = end.split(':').map(Number)
        const cur = new Date()
        cur.setHours(sh, sm, 0, 0)
        const endDate = new Date()
        endDate.setHours(eh, em, 0, 0)
        while (cur <= endDate) {
            const hh = String(cur.getHours()).padStart(2, '0')
            const mm = String(cur.getMinutes()).padStart(2, '0')
            times.push(`${hh}:${mm}`)
            cur.setMinutes(cur.getMinutes() + stepMinutes)
        }
        return times
    }
    const availableTimes = generateTimes(minTime, maxTime, 30)
    
    useEffect(() => {
        const datos = JSON.parse(localStorage.getItem('reservas') || '[]')
        setReservas(datos)
    }, [])

    const validate = () => {
        const e = {}
        if (!form.nombre.trim()) e.nombre = '*Nombre es requerido'
        if (!form.email.trim()) e.email = '*Correo es requerido'
        if (!form.fecha) e.fecha = '*Fecha es requerida'
        else if (form.fecha < today) e.fecha = '*Fecha no puede ser anterior a hoy'
        if (!form.hora) e.hora = '*Hora es requerida'
        else if (!availableTimes.includes(form.hora)) e.hora = `*Seleccione una hora válida (cada 30 minutos entre ${minTime} y ${maxTime})`
        if (!form.personas) e.personas = '*Cantidad de personas requerida'
        return e
    }

    const guardarReserva = (e) => {
        e.preventDefault()
        const validation = validate()
        setErrors(validation)
        if (Object.keys(validation).length) {
            const firstKey = Object.keys(validation)[0]
            const el = document.querySelector(`[name="${firstKey}"]`)
            if (el) el.focus()
            return
        }

        const nueva = { ...form, id: Date.now() }
        const nuevas = [nueva, ...reservas]
        setReservas(nuevas)
        localStorage.setItem('reservas', JSON.stringify(nuevas))

        setForm({ nombre: '', email: '', fecha: '', hora: '', personas: '', notas: '' })
        setNotice('Reserva guardada correctamente')
        setTimeout(() => setNotice(''), 3000)
        if (firstFieldRef.current) firstFieldRef.current.focus()
    }

    const limpiarForm = () => {
        setForm({ nombre: '', email: '', fecha: '', hora: '', personas: '', notas: '' })
        setErrors({})
        if (firstFieldRef.current) firstFieldRef.current.focus()
    }

    const borrarReserva = (id) => {
        const nuevas = reservas.filter(r => r.id !== id);
        setReservas(nuevas);
        localStorage.setItem('reservas', JSON.stringify(nuevas));
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
        setErrors(prev => ({ ...prev, [name]: undefined }))
    }

    const incrementPersonas = () => {
        const curr = Number(form.personas) || 0
        const next = Math.min(8, curr + 1)
        setForm(prev => ({ ...prev, personas: String(next) }))
        setErrors(prev => ({ ...prev, personas: undefined }))
    }

    const decrementPersonas = () => {
        const curr = Number(form.personas) || 0
        if (curr <= 1) return
        const next = curr - 1
        setForm(prev => ({ ...prev, personas: String(next) }))
        setErrors(prev => ({ ...prev, personas: undefined }))
    }

    const personasNum = Number(form.personas) || 0

    return (
        <div className="reservations-page">
            <div className="reservations-panel">
                <div className="reservations-grid">
                    <aside className="form-panel">
                        <h1>Reserva una mesa</h1>
                        <form className="res-form" onSubmit={guardarReserva} noValidate>

                            <label htmlFor="nombre">Nombre</label>
                            <input id="nombre" name="nombre" ref={firstFieldRef} value={form.nombre} onChange={handleChange} placeholder="Ej. Ana Pérez" />
                            {errors.nombre && <div className="field-error">{errors.nombre}</div>}

                            <label htmlFor="email">Correo</label>
                            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="tucorreo@ejemplo.com" />
                            {errors.email && <div className="field-error">{errors.email}</div>}

                            <div className="row">
                                <div className="col">
                                    <label htmlFor="fecha">Fecha</label>
                                    <input id="fecha" name="fecha" type="date" value={form.fecha} onChange={handleChange} min={today} />
                                    {errors.fecha && <div className="field-error">{errors.fecha}</div>}
                                </div>
                                <div className="col">
                                    <label htmlFor="hora">Hora</label>
                                    <select id="hora" name="hora" className="time-select" value={form.hora} onChange={handleChange} aria-label="Seleccionar hora">
                                        <option value="" disabled>Selecciona hora</option>
                                        {availableTimes.map(t => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                     {errors.hora && <div className="field-error">{errors.hora}</div>}
                                </div>
                            </div>

                            <label htmlFor="personas">Personas</label>
                            <div className="personas-control">
                                <div className="personas-counter" role="group" aria-label="Selector de personas">
                                    <button
                                        type="button"
                                        className="personas-btn personas-decr"
                                        onClick={decrementPersonas}
                                        aria-label="Disminuir"
                                        disabled={personasNum <= 1}
                                    >−</button>

                                    <input
                                        id="personas"
                                        name="personas"
                                        value={form.personas || ''}
                                        readOnly
                                        placeholder="—"
                                        className="personas-display"
                                        aria-live="polite"
                                    />

                                    <button
                                        type="button"
                                        className="personas-btn personas-incr"
                                        onClick={incrementPersonas}
                                        aria-label="Incrementar"
                                        disabled={personasNum >= 8}
                                    >+</button>
                                </div>
                                {errors.personas && <div className="field-error">{errors.personas}</div>}
                            </div>

                            <label htmlFor="notas">Comentarios</label>
                            <textarea id="notas" name="notas" value={form.notas} onChange={handleChange} rows={4} placeholder="Agregar detalles" />

                            <div className="actions">
                                 <button type="submit" className="btn-reservar">Reservar</button>
                                 <button type="button" className="btn-limpiar" onClick={limpiarForm}>Limpiar</button>
                             </div>

                             {notice && <div className="form-notice">{notice}</div>}
                         </form>
                    </aside>

                    <section className="list-panel">
                        <h2>Reservas guardadas</h2>
                        {!reservas.length ? (
                            <div className="no-reservations">No hay reservas registradas</div>
                        ) : (
                            <div className="reservations-list">
                                {reservas.map(reserva => (
                                    <article key={reserva.id} className="reservation-card">
                                        <div className="reservation-info">
                                            <h3>{reserva.nombre}</h3>
                                            <div className="reservation-details">
                                                <p><strong>Fecha:</strong> {reserva.fecha}</p>
                                                <p><strong>Hora:</strong> {reserva.hora ? reserva.hora : '—'}</p>
                                                <p><strong>Personas:</strong> {reserva.personas}</p>
                                                {reserva.notas && <p><strong>Notas:</strong> {reserva.notas}</p>}
                                            </div>
                                        </div>
                                        <div className="card-actions">
                                            <button type="button" onClick={() => {
                                                const nuevas = reservas.filter(r => r.id !== reserva.id);
                                                setReservas(nuevas);
                                                localStorage.setItem('reservas', JSON.stringify(nuevas));
                                            }} className="btn-borrar">
                                                Borrar
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
                <footer className="reservations-footer">Horario: 12:00 - 22:00 · Dirección: lima 123</footer>
            </div>
        </div>
    )
}