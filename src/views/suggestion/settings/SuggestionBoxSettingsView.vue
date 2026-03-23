<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  shareLink?: string
}>()

const copied = ref(false)
const checked = ref(false)
const visible = ref(false)

async function copyLink() {
  const link = props.shareLink ?? ''
  await navigator.clipboard.writeText(link)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

const qrUrl = computed(() => {
  const link = encodeURIComponent(props.shareLink ?? 'https://example.com')
  return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${link}`
})

async function downloadQr() {
  const response = await fetch(qrUrl.value)
  const blob = await response.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'qr-code.png'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="mr-120 space-y-8">

    <div class="space-y-6">
      <h2 class="text-lg font-medium">View</h2>
      <div class="space-y-4">
        <div class="space-y-6">
          <BaseInput
            :model-value="shareLink"
            label="Share Link"
            placeholder="No link yet"
            :disabled="true"
          />
          <div class="space-x-2">
            <BaseButton
              variant="secondary"
              :label="copied ? 'Copied!' : 'Copy Link'"
              size="small"
              @click="copyLink"
            />
            <BaseButton
              variant="secondary"
              label="Download QR code"
              size="small"
              @click="downloadQr"
            />
          </div>
        </div>

      </div>
    </div>

    <div class="space-y-6">
      <h2 class="text-lg font-medium">Status</h2>
      <div class="space-y-6">
        <p class="text-sm text-content leading-relaxed">
          <template v-if="checked">
            This suggestion box is <span class="text-success font-medium">active</span> — it's publicly accessible and accepting new submissions.
          </template>
          <template v-else>
            This suggestion box is <span class="text-error font-medium">inactive</span> — it's hidden from the public and not accepting submissions.
          </template>
        </p>
        <BaseButton
          variant="secondary"
          :label="checked ? 'Active' : 'Inactive'"
          size="small"
          @click="checked = !checked"
        />
      </div>
    </div>

    <div class="space-y-6">
      <h2 class="text-lg font-medium">Update</h2>
      <div class="space-y-4">
        <BaseInput
          placeholder="Suggestion Box name"
          label="Name"
        />
        <BaseTextareaField
          id="description"
          label="Description"
          :rows="5"
          :auto-resize="true"
        />
      </div>
      <BaseButton
        variant="primary"
        label="Update Suggestion Box"
        size="small"
      />
    </div>

    <div class="space-y-6">
      <h2 class="text-lg font-medium">Delete</h2>
      <p class="text-sm text-content leading-relaxed">
        Deleting this suggestion box will permanently erase it from the platform. All submissions and data will also be deleted. This action cannot be undone.
      </p>
      <BaseButton
        variant="danger"
        label="Delete Suggestion Box"
        size="small"
        @click="visible = true"
      />
    </div>

    <BaseDialog v-model:visible="visible" header="Delete Item">
      <p class="text-sm text-content-muted mb-6">
        This action cannot be undone. This will permanently delete the
        <span class="text-content font-medium">Office 1</span>
        and all of its data.
      </p>

      <BaseInput
        label="Name"
        placeholder="Type &quot;Office 1&quot; to confirm"
        required
      />

      <template #footer>
        <BaseButton variant="secondary" label="Cancel" size="small" @click="visible = false" />
        <BaseButton variant="danger" label="Delete" size="small" />
      </template>
    </BaseDialog>
  </div>
</template>
