// Генерирует UPDATE для одной карты в таблице `matches` по её id.
// Колонки берутся из ключей resultData[0] — они совпадают с колонками таблицы.
// id в SET не попадает: он только в WHERE.

const escapeSQL = (value) => {
	if (value === null || value === undefined) return 'NULL'
	return `'${String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
}

const toSQLCommandUpdateMatch = (id, resultData) => {
	if (!resultData || resultData.length === 0) return ''

	const row = resultData[0]
	const setPart = Object.entries(row)
		.filter(([key]) => key !== 'id')
		.map(([key, value]) => `\`${key}\`=${escapeSQL(value)}`)
		.join(', ')

	return `UPDATE \`matches\` SET ${setPart} WHERE \`id\` = ${Number(id)};\n`
}

export default toSQLCommandUpdateMatch
