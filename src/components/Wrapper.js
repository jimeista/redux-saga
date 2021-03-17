import React from 'react'

const styles = {
  wrapper: {
    // display: 'flex',
    width: '80%',
    margin: 'auto',
    paddingTop: 20,
  },
}

// кастомная обертка стилей компонентов
export const Wrapper = ({ children }) => {
  return <div style={styles.wrapper}>{children}</div>
}
