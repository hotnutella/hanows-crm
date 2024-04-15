import React from 'react'
import { InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import styles from './SearchBar.module.css'

const SearchBar = () => {
    return (
        <Paper component="form" className={styles.search}>
            <InputBase 
                placeholder="Search"
                fullWidth
                startAdornment={<SearchIcon/>} />
        </Paper>
    )
}

export default SearchBar