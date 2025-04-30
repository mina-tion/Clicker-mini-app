import {
  Step,
  StepDescription,
  StepIndicator,
  StepSeparator,
  StepTitle,
  Stepper,
  useSteps,
  Box,
  chakra,
} from '@chakra-ui/react';

const StepWithChakraProps = chakra(Step);
const StepTitleWithChakraProps = chakra(StepTitle);
const StepDescriptionWithChakraProps = chakra(StepDescription);
const StepSeparatorWithChakraProps = chakra(StepSeparator);

const steps = [
  { title: 'Bronze', description: '2000 Energy / 2 000 G-points' },
  { title: 'Silver', description: '4000 Energy / 4 000 G-points' },
  { title: 'Gold', description: '6000 Energy / 6 000 G-points' },
];

export function LeaderboardStepper() {
  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  return (
    <Box p='20px'>
      <Stepper
        index={activeStep}
        orientation='vertical'
        height='236px'
        size='sm'
        w='100%'
        gap='4px'
      >
        {steps.map((step, index) => (
          <StepWithChakraProps key={index} gap='32px' h='76px'>
            <StepIndicator
              sx={{
                '[data-status=complete] &': {
                  background: '#A7F67B',
                  borderColor: '#A7F67B',
                },
                '[data-status=active] &': {
                  background: '#A7F67B',
                  borderColor: '#A7F67B',
                },
                '[data-status=incomplete] &': {
                  background: 'transparent',
                  borderColor: '#2F2F2F',
                  borderWidth: '4px',
                },
                h: '12px',
                w: '12px',
              }}
            />

            <Box>
              <StepTitleWithChakraProps
                fontFamily='Russo One'
                fontWeight='400'
                fontStyle='normal'
                fontSize='16px'
                lineHeight='24px'
              >
                {step.title}
              </StepTitleWithChakraProps>
              <StepDescriptionWithChakraProps
                fontFamily='Russo One'
                fontWeight='400'
                fontStyle='normal'
                fontSize='16px'
                lineHeight='24px'
                color='#AAAAAA'
              >
                {step.description}
              </StepDescriptionWithChakraProps>
            </Box>

            <StepSeparatorWithChakraProps
              sx={{
                '[data-status=complete] &': {
                  background: '#A7F67B',
                  w: '4px',
                  left: '4px',
                  top: '25px',
                },
                '[data-status=active] &': {
                  background: '#2F2F2F',
                  w: '4px',
                  left: '4px',
                  top: '25px',
                },
                '[data-status=incomplete] &': {
                  background: '#2F2F2F',
                  w: '4px',
                  left: '4px',
                },
              }}
            />
          </StepWithChakraProps>
        ))}
      </Stepper>
    </Box>
  );
}
