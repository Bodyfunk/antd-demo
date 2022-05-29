import React from 'react';
import { Col, Row, Button, Collapse, Tabs, Switch, Tag, Popover } from 'antd';
import './App.less';

const { Panel } = Collapse;
const { TabPane } = Tabs;
// 数据
const list = [{
    id: 1,
    name: 'Luigi Toscano',
    email: 'Luigi@gmail.com',
    content: 'Uploaded path set 1.',
    tag: '',
    info: [],
    time: 'Nov 30,2020 18:24',
    Verified: 1,
    CodeReview: undefined,
    Workflow: undefined,
    VerifiedRemoved: false,
    viewDiff:true,
},
{
    id: 2,
    name: 'Zuul',
    email: '',
    content: 'Added to reviewer:',
    tag: 'Zuul',
    info: [],
    time: 'Nov 30,2020 18:24',
    Verified: undefined,
    CodeReview: 2,
    Workflow: 1,
    VerifiedRemoved: false,
    viewDiff:false,
},
{
    id: 3,
    name: 'Luigi Toscano',
    email: 'Luigi@gmail.com',
    content: 'Build succeeded (check pipeline).',
    tag: '',
    info: ['openstack-tox-molecule https://zuul.opendev.org/t/openstack/build/b218ec9b40b442a5874fc571e5d3b5e5 : SUCCESS in 3m 29s',
        'openstack-tox-linters https://zuul.opendev.org/t/openstack/build/1533443fa79543c7bd8480f9952b09aa : SUCCESS in 6m 47s',
        'tripleo-tox-molecule https://zuul.opendev.org/t/openstack/build/89dd9757afac45de86ac26bb64bff03b : SUCCESS in 4m 47s',
        'tripleo-upgrade-centos-8-molecule https://zuul.opendev.org/t/openstack/build/2da7b8f6b542438b8209c903c3f3cfdb : SUCCESS in 10m 29s'],
    time: 'Nov 30,2020 18:24',
    Verified: undefined,
    CodeReview: 2,
    Workflow: 1,
    VerifiedRemoved: false,
    viewDiff: false,
},
{
    id: 4,
    name: 'Luigi Toscano',
    email: 'Luigi@gmail.com',
    content: 'Uploaded path set 1.',
    tag: '',
    info: [],
    time: 'Nov 30,2020 18:24',
    Verified: undefined,
    CodeReview: undefined,
    Workflow: undefined,
    VerifiedRemoved: true,
    viewDiff: false,
    },
    {
        id: 5,
        name: 'Sergii Golovatiuk',
        email: 'SerG@gmail.com',
        content: 'Added to reviewer:',
        tag: 'Sergii Golovatiuk',
        info: [],
        time: 'Nov 30,2020 18:24',
        Verified: undefined,
        CodeReview: undefined,
        Workflow: undefined,
        VerifiedRemoved: false,
        viewDiff: false,
    },];
// 隐藏的数据
const hiddenList = [{
    id: 99,
    name: 'Luigi Toscano',
    email:'Luigi@Gmail.com',
    content: 'Added to reviewer:',
    tag: 'Luigi Toscano',
    info: [],
    time: 'Nov 30,2020 18:24',
    Verified: undefined,
    CodeReview: undefined,
    Workflow: undefined,
    VerifiedRemoved: false,
    viewDiff: false,
},]

// 折叠面板头部
class CollapseHeader extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showElem: true,
        }
    }
    // 加上邮箱地址
    popoverContent(item) {
        return (<div>
            <div>{item.name}</div>
            <div>{ item.email }</div>
        </div>
        )
    }
    render() {
        return (
            <div className='headerDiv'>
                <Row gutter={16}>
                    {/* <Col span={4}> */}
                        <span className='header_span'>
                            {this.props.item.name}
                        </span>
                    {/* </Col> */}

                    {/* <Col span={20}> */}
                    {
                        this.props.item.Verified ? (<Tag color="green" className='tag'>Verified +{ this.props.item.Verified}</Tag>):null
                    }
                   
                   
                    {
                        this.props.item.CodeReview ? (<Tag color="#7dc99a" className='tag'>Code-Review +{ this.props.item.CodeReview}</Tag>):null
                    }
                
                   
                    {
                        this.props.item.Workflow ? (<Tag color="#7dc99a" className='tag'>Workflow +{this.props.item.Workflow}</Tag>) : null
                    }
                    
                    {
                        this.props.item.VerifiedRemoved?(<Tag color="#dadce0" className='tag'>Verified removed</Tag>):null}
                
                        {
                        this.props.activeId.indexOf(this.props.item.id + '') >= 0 ? null : (<div className='ellipsis'>{this.props.item.content}{this.props.item.tag ? (<Popover content={this.popoverContent(this.props.item)} placement="right"><Tag className='Tag_content'>{this.props.item.tag}</Tag></Popover>):null }{ this.props.item.info[0]?" -" + this.props.item.info[0]:null }</div>)
                        }
                    {/* </Col> */}
                </Row>
            </div>
        )
    }
}

// 折叠面板尾部
class CollapseOtherHeader extends React.Component{
    // 转换时间格式
    timeFormat(time) {
        return (<div>
                    <div>{time}</div>
                    <div>UTC+08:00</div>
                </div>
            )
    }
    render() {
        return (
            <div className='SubtitleDiv'>

                <Row>
                    <Col span={8}>
                        {
                            this.props.item.viewDiff ? (<Button type='text' size='small' className='button' onClick={e => e.stopPropagation()}>VIEW DIFF</Button>):null
                        }
                    </Col>
                    <Col span={16}>
                        <span style={{ color:'#606368'}}>
                            Patchset 1 | {<Popover content={this.timeFormat(this.props.item.time)}>{<a href='javascript;' className='a_time'>{this.props.item.time}</a>}</Popover>}
                        </span>
                    </Col>
                </Row>
            </div>
        )
    }
}

// 无序列表
class UlList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderTextUrl(text) {
        return <TextUrl text={text}></TextUrl>
    }

    render() {
        return (
            <ul>
                {this.props.info.map((item, index) => {
                    return (
                        <li key={index}>
                            {this.renderTextUrl(item)}
                        </li>
                    )
                })}
            </ul>
        )
    }
}

// 渲染 text 中的 url 为超链接
class TextUrl extends React.Component {
    render() {
        let result_array = [];
        const if_sep = c => ',，、。 []\n'.indexOf(c) === -1;
        for (let c of this.props.text) {
            if (
                (if_sep(c) || (!result_array.length))
                && if_sep(result_array.slice(-1).slice(-1))
            ) {
                result_array.push(result_array.pop() + c)
            } else {
                result_array.push(c)
            }
        }
        return (
            <span
                dangerouslySetInnerHTML={{
                    __html: result_array.map(str => str.search(/\S+\.\S+/) === -1 ? str : `<a href="${str}" target="_blank" class="a">${str}</a>`).join('')
                }}
            />
        )
    }
}

// 折叠面板组件
class CollapseApp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isActive: [],   //展开的折叠面板
            checked: false, //滑块选择器的状态
            open: true,     //是否展开所有面板
        };

        // 重新绑定this
        this.onChange = this.onChange.bind(this);
        this.showHidden = this.showHidden.bind(this);
        this.expandAll = this.expandAll.bind(this);
    }
    renderCollapseHeader(item, activeId) {
        return <CollapseHeader item={item} activeId={activeId}></CollapseHeader>
    }

    renderCollapseOtherHeader(item, index) {
        return <CollapseOtherHeader item={item} index={index}></CollapseOtherHeader>
    }

    renderUlList(info) {
        return <UlList info={info}></UlList>
    }

    onChange(key) {
        this.setState({isActive:key})
    }

    showHidden(checked){
        this.setState({ checked: checked });
    };

    expandAll() {
        let idArray;
        idArray =  [...list, ...hiddenList].map(item => {
            return item.id+'';
        })

        this.setState({
            isActive: idArray,
            open:false});
    }

    closeAll = () => {
        // 使用箭头函数避免this指向问题
        this.setState({
            isActive: [],
            open: true
        });
    }

    popoverContent(item) {
        return (<div>
            <div>{item.name}</div>
            <div>{item.email}</div>
        </div>
        )
    }


    render() {
        let hiddenLength = hiddenList.length;
        return (
            <div className='main'>
                <Tabs defaultActiveKey='1'>
                    <TabPane tab="Change Log" key="1">
                        <Row justify='space-between'>
                            <Col span={5}>
                                <Switch className='switch' onChange={this.showHidden}/>
                                <span className='span_text'>
                                    Show all entries
                                </span>
                                {
                                    this.state.checked ? null : (<span className='span_text' style={{ color: '#5f6368' }}>({hiddenLength} hidden)</span>)
                                }
                                
                            </Col>
                            <Col span={2}>
                                {
                                    this.state.open ? (<Button type='text' onClick={this.expandAll} className='button'>EXPAND ALL</Button>)
                                        : (<Button type='text' onClick={this.closeAll} className='button' >CLOSE ALL</Button>)
                                }
                            </Col>
                        </Row>
                        <div className='CollapseDiv'>
                            <Collapse onChange={this.onChange} activeKey={this.state.isActive} expandIconPosition="right">
                                {
                                    this.state.checked ? (hiddenList.map((item, index) => {
                                        return (
                                            <Panel header={this.renderCollapseHeader(item, this.state.isActive)}
                                                extra={this.renderCollapseOtherHeader(item, index)} key={item.id}>
                                                <p>{item.content}{item.tag ? (<Popover content={this.popoverContent(item)} placement="right"><Tag className='Tag_content'>{item.tag}</Tag></Popover>) : null}</p>
                                                {this.renderUlList(item.info)}
                                            </Panel>
                                        )
                                    })):null
                                }
                                {
                                    list.map((item, index) => {
                                        return (
                                            <Panel header={this.renderCollapseHeader(item, this.state.isActive)}
                                                extra={this.renderCollapseOtherHeader(item, index)} key={item.id}>
                                                <p>{item.content}{item.tag ? (<Popover content={ this.popoverContent(item) } placement="right"><Tag className='Tag_content'>{item.tag}</Tag></Popover>) : null}</p>
                                                {this.renderUlList(item.info)}
                                            </Panel>
                                        )
                                    })
                                }
                            </Collapse>
                        </div>
                    </TabPane>

                    <TabPane tab="Comment Threads" key="2">
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default CollapseApp;
