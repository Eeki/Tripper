import React, { Component } from 'react'
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import OptionsIcon from 'material-ui/svg-icons/action/build';

export default class HotelSelector extends Component {



  render() {

    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        width: 500,
        height: 450,
        overflowY: 'auto',
        marginBottom: 24,
      }
    };

    const tilesData = [
      {
        img: 'assets/img/image1.jpg',
        title: 'Breakfast',
        author: 'jill111',
        featured: true,
      },
      {
        img: 'assets/img/image2.jpg',
        title: 'Morning',
        author: 'fancycrave1',
        featured: true,
      }
    ];

    return(
      <div style={styles.root}>
        <GridList
          cols={2}
          cellHeight={200}
          padding={1}
          style={styles.gridList}
        >
          {tilesData.map((tile) => (
            <GridTile
              key={tile.img}
              title={tile.title}
              actionIcon={<IconButton><OptionsIcon color="white" /></IconButton>}
              actionPosition="left"
              titlePosition="top"
              titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
              cols={tile.featured ? 2 : 1}
              rows={tile.featured ? 2 : 1}
            >
              <img src={tile.img} />
            </GridTile>
          ))}
        </GridList>
      </div>
    )
  }
}