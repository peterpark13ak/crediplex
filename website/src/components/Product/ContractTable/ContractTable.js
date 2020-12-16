import React, { Component } from 'react';
import styles from './ContractTable.css.js'
import { Card} from  '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class ContractTable extends Component {

  render()   {    
    let  {product} = this.props

    if (!product || !product.contract_costs || product.contract_costs.length === 0) {
      return (
        <React.Fragment>
          <Card style={styles.Product}>  
            
            <div style={styles.Title}>
              No hay tarifas.
            </div>
          </Card>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <Card style={styles.Product}>  
          
          <div style={styles.Title}>
            Costos de Contratación
          </div>

          <Divider style={{marginTop:'15px',marginBottom:'15px'}}/>

          <Table style={styles.table}>
            <TableHead>
              <TableRow>
                <TableCell>Concepto</TableCell>
                <TableCell align="center">Gratis</TableCell>
                <TableCell align="center">Moneda</TableCell>
                <TableCell align="center">Cantidad fija</TableCell>
                <TableCell align="center">Factor</TableCell>
                <TableCell align="center">Cantidad de factor</TableCell>
                <TableCell align="center">Factor de referencia</TableCell>
                <TableCell align="center">Periodicidad</TableCell>
                <TableCell align="center">Condición</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {product.contract_costs.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.concept}
                  </TableCell>
                  <TableCell align="right">{row.is_free === true && (row.free_ops.number + '(' + row.free_ops.period +  ')')}</TableCell>
                  <TableCell align="right">{row.cost.currency}</TableCell>
                  <TableCell align="right">{row.cost.fixed_amount}</TableCell>
                  <TableCell align="right">{row.cost.factor}</TableCell>
                  <TableCell align="right">{row.cost.factor_amount}</TableCell>
                  <TableCell align="right">{row.cost.factor_reference}</TableCell>
                  <TableCell align="right">{row.cost.factor_period}</TableCell>
                  <TableCell align="right">{row.cond}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

        </Card>
     </React.Fragment>

    );
  }
}

export default withStyles(styles)(ContractTable);
