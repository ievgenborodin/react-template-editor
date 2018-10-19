import React, { Component } from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import { Form, Spacer, FormButton, ErrorText } from './Styled'
import { capitalize } from '../helpers';


class CellForm extends Component {
    
    constructor(props) {
        super(props)        
        
        let data = {};
        props.fields.map(item=>{
            data[item.name] = (props.data && (item.name in props.data)) ? props.data[item.name] : item.default;
            return null;
        });

        this.state = {
            isNew: Object.keys(props.data).length ? false : true, 
            fields: props.fields,
            data: data,
            errorKeys: [],
            errors: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.filterErrors = this.filterErrors.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.activeTab !== this.props.activeTab) {
            let data = {};
            nextProps.fields.map(item=>{
                data[item.name] = (nextProps.data && (item.name in nextProps.data)) ? nextProps.data[item.name] : item.default;
            });
            this.setState({ fields: nextProps.fields, errors: null, errorKeys: [], data: data });
        }
    }

    handleChange(key, value) {
        const { data } = this.state;
        if (!data.key || (data.key != value))
            this.setState({
                data: {...data, [key]: value}
            });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { data } = this.state; 
        if (this.validate(e.currentTarget.dataset.keys.split(','), data))
            return false;
        this.props.onSubmit({ type: this.props.activeTab, params: data })
    }

    validate(keys, values) {
        let errors = {};
    
        // width 
        if (!values.width)
            errors.width = 'Please enter cell\'s width';
        else if (!(values.width > 0))
            errors.width = 'Width has to be a positive number';
        // ratio    
        if (!values.ratio)
            errors.ratio = 'Please enter cell\'s ratio';            
        else if (!/^\d+:\d+$/i.test(values.ratio)) 
            errors.ratio = 'Invalid ratio [D:D]';
        // alignment
        if (!values.align)
            errors.aling = 'Please enter cell\'s alignment';  
        // shape
        if (!values.shape)
            errors.shape = 'Please specify element shape';           
        // lines 
        if (!values.lines)
            errors.lines = 'Please enter number of lines';
        else if (!(values.lines > 0))
            errors.lines = 'Line number has to be a positive number';
        // columns
        if (!values.columns)
            errors.columns = 'Please enter number of columns';            
        else if (!(values.columns > 0))
            errors.columns = 'Column number has to be a positive number';
        // text type
        if (!values.type)
            errors.type = 'Please specify text type';
    
        return this.filterErrors(errors, Object.keys(values).concat(keys));
    }

    filterErrors(errorsRaw, keys) {
        let errors = Object.keys(errorsRaw)
            .filter(key => keys.includes(key))
            .reduce((obj, key) => { return {...obj, [key]: errorsRaw[key] }; }, {});

        // return results
        let hasErrors = Object.keys(errors).length ? true : false;
        if (hasErrors) { 
            let firstKey = Object.keys(errors)[0];
            errors = {[firstKey]: errors[firstKey]};
        } else errors = null;
        this.setState({errors: errors})
        return hasErrors;
    }

    render() {
        const { theme } = this.props;
        const { data, fields, errors, isNew } = this.state;
        let errorKeys = errors ? Object.keys(errors) : [];
        return (
            <Form onSubmit={e => this.handleSubmit(e)} data-keys={fields.map(k => k.name).join(',')}>
                {fields.map((item,f) => {
                    let key = this.props.activeTab + '-' + item.name;
                    return item.type == 'checkbox' ? (
                        <FormControlLabel
                            key={key}
                            control={
                                <Checkbox
                                checked={data[item.name]}
                                onChange={e => this.handleChange(item.name, e.currentTarget.checked)}
                                />
                            }
                            label={item.label}
                            />
                    ) : item.type == 'select' ? (
                        <FormControl key={key} error={errorKeys.includes(item.name)}>
                            <InputLabel>{item.label}</InputLabel>
                            <Select
                                value={data[item.name]}
                                onChange={e => this.handleChange(item.name, e.currentTarget.dataset.value)}
                             >
                                {item.options.map((option, o) => 
                                    <MenuItem key={`option-${f}-${o}`} value={option}>{capitalize(option)}</MenuItem>)}
                            </Select>
                        </FormControl>
                    ) : (
                        <TextField
                            key={key}
                            label={item.label}
                            defaultValue={data[item.name]}
                            type={item.type}
                            onChange={e => this.handleChange(item.name, e.currentTarget.value)}
                            error={errorKeys.includes(item.name)}
                            />
                    )
                })}

                <Spacer/>
 
                {errors ? 
                    <ErrorText theme={theme}>{Object.values(errors)[0]}<Spacer/></ErrorText>:null}
                
                <Spacer size="15px" />
                
                <FormButton theme={theme} capitalize full type="submit">Save</FormButton>

                {isNew ? null : 
                    <FormButton theme={theme} full onClick={e=>{e.preventDefault(); this.props.onSubmit(null)}} background="none">Delete</FormButton>} 
            </Form>
        )
    }
}

export default CellForm