import { computed, defineComponent, h, type PropType } from 'vue'
import { omit, pick } from 'lodash-es'
import { ElCascader, ElCol, ElForm, ElFormItem, ElInput, ElRow, ElCheckbox, ElDatePicker, ElInputNumber, ElRadio, ElRate, ElSelect, ElSlider, ElSwitch, ElTimePicker, ElTimeSelect, ElTransfer, ElUpload } from 'element-plus'

type FormulateProps = {
  // customize props
  fields: Record<string, any>
  defaultTag: 'text' | 'textarea' | 'switch'
  layout?: boolean
  gutter?: number
  justify?: string
  align?: string

  // form props
  inline?: boolean
  labelPosition?: 'left' | 'right' | 'top'
  labelWidth?: string | number
  labelSuffix?: string
  hideRequiredAsterisk?: boolean
  requireAsteriskPosition?: 'left' | 'right'
  inlineMessage?: boolean
  statusIcon?: boolean
  validateOnRuleChange?: boolean
  size?: '' | 'large' | 'default' | 'small'
  disabled?: boolean
  scrollToError?: boolean
  scrollIntoViewOptions?: object | Record<string, any> | boolean
  rules?: object[]
}

// fields: {
//   name: { label: '用户名', placeholder: '请输入用户名', span: 12 },
//   phone: { label: '手机号', placeholder: '请输入手机号', span: 12 }
// }

const formulateInputMap = {
  input: ElInput,
  cascader: ElCascader,
  checkbox: ElCheckbox,
  radio: ElRadio,
  rate: ElRate,
  select: ElSelect,
  silder: ElSlider,
  switch: ElSwitch,
  transfer: ElTransfer,
  upload: ElUpload,
  'input-number': ElInputNumber,
  'date-picker': ElDatePicker,
  'time-picker': ElTimePicker,
  'time-select': ElTimeSelect,
}

const Formulate = defineComponent({
  props: {
    props: Object as PropType<FormulateProps>
  },
  setup(props) {
    const formProps = computed(() => omit(props.props, ['fields', 'defaultTag', 'layout', 'gutter', 'justify', 'align']))
    const formItems = computed(renderFormItems)
    const rowAttrs = computed(() => pick(props.props, ['gutter', 'justify', 'align']))

    function renderFormItems() {
      const fields = props.props?.fields
      if (!fields) return

      const keys = Object.keys(props.props?.fields)

      return keys.map((key) => {
        const tag = (fields[key]?.tag ?? props.props?.defaultTag) as keyof typeof formulateInputMap
        const Content = (
          <ElFormItem prop={key} label={fields[key]?.label} labelWidth={fields[key]?.labelWidth}>
            {h(formulateInputMap[tag], omit(fields[key], ['span', 'tag', 'label', 'labelWidth']) as any)}
          </ElFormItem>
        )

        return props.props?.layout
          ? <ElCol span={fields[key].span}>{Content}</ElCol>
          : Content
      })
    }

    return () => (
      <ElForm {...(formProps.value as any)}>
        {props.props?.layout
          ? (<ElRow {...rowAttrs.value as any}>{formItems.value}</ElRow>)
          : formItems.value}
      </ElForm>
    )
  }
})

export default Formulate
