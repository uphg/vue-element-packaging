import { computed, defineComponent, type PropType } from 'vue'
import { omit, pick } from 'lodash-es'
import { ElForm, ElFormItem } from 'element-plus'

type Schema = {
  // customize props
  fields: object
  defaultType: 'text' | 'textarea' | 'switch'

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

const Formulate = defineComponent({
  props: {
    schema: Object as PropType<Schema>
  },
  setup(props) {
    const formProps = computed(() => omit(props.schema, ['fields']))

    return () => (
      <ElForm {...formProps.value}>
        <ElFormItem></ElFormItem>
      </ElForm>
    )
  }
})

export default Formulate
